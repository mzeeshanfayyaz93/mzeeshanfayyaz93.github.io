"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useThemeColors } from "@/hooks/useThemeColors";

const R = 1.6; // globe radius

// Decorative network of markets, with Dubai as the hub.
const HUB = { name: "Dubai", lat: 25.2, lon: 55.3 };
const CITIES = [
  { lat: 51.5, lon: -0.1 }, // London
  { lat: 40.7, lon: -74.0 }, // New York
  { lat: 1.35, lon: 103.8 }, // Singapore
  { lat: 19.1, lon: 72.9 }, // Mumbai
  { lat: -26.2, lon: 28.0 }, // Johannesburg
  { lat: -33.9, lon: 151.2 }, // Sydney
  { lat: -23.5, lon: -46.6 }, // Sao Paulo
  { lat: 35.7, lon: 139.7 }, // Tokyo
  { lat: 6.5, lon: 3.4 }, // Lagos
  { lat: 41.0, lon: 29.0 }, // Istanbul
  { lat: -1.3, lon: 36.8 }, // Nairobi
  { lat: 22.3, lon: 114.2 }, // Hong Kong
  { lat: 30.0, lon: 31.2 }, // Cairo
  { lat: 33.7, lon: 73.0 }, // Islamabad
];

function latLon(lat: number, lon: number, radius = R) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeSprite(kind: "soft" | "disc") {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  if (kind === "soft") {
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.25, "rgba(255,255,255,0.65)");
    g.addColorStop(1, "rgba(255,255,255,0)");
  } else {
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.7, "rgba(255,255,255,1)");
    g.addColorStop(1, "rgba(255,255,255,0)");
  }
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const trailVertex = /* glsl */ `
  attribute float aAlpha;
  attribute float aSize;
  uniform float uScale;
  varying float vAlpha;
  void main() {
    vAlpha = aAlpha;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uScale / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;
const trailFragment = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = pow(smoothstep(0.5, 0.0, d), 1.5);
    gl_FragColor = vec4(uColor, a * vAlpha);
  }
`;

/** A glowing satellite with a fading comet tail, riding on an orbit ring (ring-local coordinates). */
function Satellite({
  radius,
  speed,
  phase,
  color,
  additive,
  reduced,
  trail = 34,
}: {
  radius: number;
  speed: number;
  phase: number;
  color: string;
  additive: boolean;
  reduced: boolean;
  trail?: number;
}) {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const alpha = new Float32Array(trail);
    const sizes = new Float32Array(trail);
    for (let k = 0; k < trail; k++) {
      const f = k / (trail - 1);
      alpha[k] = Math.pow(1 - f, 1.8);
      sizes[k] = k === 0 ? 0.28 : 0.15 * (1 - f * 0.75);
    }
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(trail * 3), 3));
    g.setAttribute("aAlpha", new THREE.BufferAttribute(alpha, 1));
    g.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    return g;
  }, [trail]);

  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color(color) }, uScale: { value: 300 } },
        vertexShader: trailVertex,
        fragmentShader: trailFragment,
        transparent: true,
        depthWrite: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    mat.uniforms.uColor.value.set(color);
    mat.blending = additive ? THREE.AdditiveBlending : THREE.NormalBlending;
    mat.needsUpdate = true;
  }, [color, additive, mat]);

  useEffect(() => () => {
    geo.dispose();
    mat.dispose();
  }, [geo, mat]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const a = phase + t * speed * 0.5 * (reduced ? 0.3 : 1);
    const attr = geo.getAttribute("position") as THREE.BufferAttribute;
    for (let k = 0; k < trail; k++) {
      const ang = a - k * 0.045 * Math.sign(speed);
      attr.setXYZ(k, Math.cos(ang) * radius, Math.sin(ang) * radius, 0);
    }
    attr.needsUpdate = true;
    mat.uniforms.uScale.value = state.size.height * 0.5 * state.gl.getPixelRatio();
  });

  return <points geometry={geo} material={mat} frustumCulled={false} />;
}

/** Expanding rings that ping outward from the Dubai hub. */
function HubPing({ color, additive, reduced }: { color: string; additive: boolean; reduced: boolean }) {
  const refs = [useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null)];
  const pos = useMemo(() => latLon(HUB.lat, HUB.lon, R * 1.012), []);
  const quat = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), pos.clone().normalize()), [pos]);

  useFrame((state) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;
    refs.forEach((r, i) => {
      const m = r.current;
      if (!m) return;
      const u = (t * 0.2 + i / refs.length) % 1;
      const s = 0.06 + u * 0.75;
      m.scale.set(s, s, s);
      (m.material as THREE.MeshBasicMaterial).opacity = (1 - u) * (1 - u) * 0.9;
    });
  });

  return (
    <group position={pos} quaternion={quat}>
      {refs.map((r, i) => (
        <mesh key={i} ref={r}>
          <ringGeometry args={[0.92, 1, 64]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={additive ? THREE.AdditiveBlending : THREE.NormalBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Distant star dust that drifts and parallaxes with the pointer. */
function Stars({
  density,
  mouse,
  color,
  additive,
  sprite,
  reduced,
}: {
  density: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  color: string;
  additive: boolean;
  sprite: THREE.Texture;
  reduced: boolean;
}) {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const rand = mulberry32(21);
    const n = Math.round(900 * density);
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const u = rand() * 2 - 1;
      const th = rand() * Math.PI * 2;
      const r = 6 + rand() * 9;
      const s = Math.sqrt(1 - u * u);
      arr[i * 3] = Math.cos(th) * s * r;
      arr[i * 3 + 1] = u * r * 0.7;
      arr[i * 3 + 2] = Math.sin(th) * s * r - 3;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [density]);
  useEffect(() => () => geo.dispose(), [geo]);

  useFrame((state) => {
    const p = ref.current;
    if (!p) return;
    const t = state.clock.elapsedTime;
    p.rotation.y = t * (reduced ? 0.002 : 0.007) + mouse.current.x * 0.12;
    p.rotation.x += (mouse.current.y * 0.08 - p.rotation.x) * 0.05;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        color={color}
        map={sprite}
        size={0.11}
        sizeAttenuation
        transparent
        opacity={additive ? 0.75 : 0.5}
        blending={additive ? THREE.AdditiveBlending : THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  );
}

type SceneProps = {
  density: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  reduced: boolean;
};

function Scene({ density, mouse, reduced }: SceneProps) {
  const { accent, accent2, accent3, theme } = useThemeColors();
  const size = useThree((state) => state.size);
  // on tall, narrow screens shrink the globe so it still fits the width
  const fit = Math.min(1, Math.max(0.5, (size.width / size.height) * 1.1)) * 0.92;
  const group = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);

  const additive = theme !== "light";
  const soft = useMemo(() => makeSprite("soft"), []);
  const disc = useMemo(() => makeSprite("disc"), []);
  useEffect(() => () => {
    soft.dispose();
    disc.dispose();
  }, [soft, disc]);

  // Dots spread evenly over the sphere (Fibonacci lattice).
  const dots = useMemo(() => {
    const n = Math.round(1500 * density);
    const arr = new Float32Array(n * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      arr[i * 3] = Math.cos(th) * r * R;
      arr[i * 3 + 1] = y * R;
      arr[i * 3 + 2] = Math.sin(th) * r * R;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [density]);

  // Thin network lines between nearby nodes.
  const network = useMemo(() => {
    const rand = mulberry32(7);
    const count = Math.round(170 * density);
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const u = rand() * 2 - 1;
      const th = rand() * Math.PI * 2;
      const r = Math.sqrt(1 - u * u);
      nodes.push(new THREE.Vector3(Math.cos(th) * r * R, u * R, Math.sin(th) * r * R));
    }
    const pts: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      let links = 0;
      for (let j = i + 1; j < nodes.length && links < 3; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 0.62) {
          pts.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
          links++;
        }
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, [density]);

  // Arcs from the Dubai hub to each market.
  const arcs = useMemo(() => {
    const hub = latLon(HUB.lat, HUB.lon);
    return CITIES.map((c) => {
      const end = latLon(c.lat, c.lon);
      const mid = hub.clone().add(end).multiplyScalar(0.5);
      const lift = 1 + hub.distanceTo(end) * 0.16;
      mid.normalize().multiplyScalar(R * lift);
      return new THREE.QuadraticBezierCurve3(hub, mid, end);
    });
  }, []);

  const arcGeo = useMemo(() => {
    const pts: number[] = [];
    arcs.forEach((curve) => {
      const p = curve.getPoints(56);
      for (let i = 0; i < p.length - 1; i++) {
        pts.push(p[i].x, p[i].y, p[i].z, p[i + 1].x, p[i + 1].y, p[i + 1].z);
      }
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, [arcs]);

  const markers = useMemo(() => {
    const arr: number[] = [];
    CITIES.forEach((c) => {
      const v = latLon(c.lat, c.lon, R * 1.005);
      arr.push(v.x, v.y, v.z);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(arr, 3));
    return g;
  }, []);

  const hubGeo = useMemo(() => {
    const v = latLon(HUB.lat, HUB.lon, R * 1.01);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute([v.x, v.y, v.z], 3));
    return g;
  }, []);

  // Moving light pulses travelling along the arcs.
  const pulses = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(arcs.length * 3), 3));
    return g;
  }, [arcs]);

  useEffect(() => () => {
    [dots, network, arcGeo, markers, hubGeo, pulses].forEach((g) => g.dispose());
  }, [dots, network, arcGeo, markers, hubGeo, pulses]);

  const rot = useRef({ x: 0.25, y: 0 });

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const speed = reduced ? 0.25 : 1;
    const t = state.clock.elapsedTime;

    // intro: the globe flies in from far away while spinning fast, then settles
    const introT = reduced ? 1 : Math.min(1, Math.max(0, (t - 0.45) / 2.6));
    const e = 1 - Math.pow(1 - introT, 3);
    // scroll: pull back and spin up as the hero leaves the screen
    const p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.9)));

    state.camera.position.z = THREE.MathUtils.lerp(10, 5.4, e) + p * 1.4;
    const s = fit * (0.6 + 0.4 * e) * (1 - p * 0.1);
    g.scale.setScalar(s);

    // slow spin plus a gentle lean toward the pointer
    rot.current.y += delta * (0.07 + p * 0.25) * speed;
    const targetX = 0.25 + mouse.current.y * 0.32 + p * 0.35;
    const targetY = mouse.current.x * 0.5 + Math.pow(1 - e, 2) * 5;
    g.rotation.x += (targetX - g.rotation.x) * Math.min(1, delta * 3);
    g.rotation.y += (rot.current.y + targetY - g.rotation.y) * Math.min(1, delta * 3);

    if (ringA.current) ringA.current.rotation.z += delta * 0.05 * speed;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.04 * speed;

    if (!reduced) {
      const attr = pulses.getAttribute("position") as THREE.BufferAttribute;
      arcs.forEach((curve, i) => {
        const u = (t * 0.1 + i / arcs.length) % 1;
        const p2 = curve.getPoint(u);
        attr.setXYZ(i, p2.x, p2.y, p2.z);
      });
      attr.needsUpdate = true;
    }
  });

  const blending = additive ? THREE.AdditiveBlending : THREE.NormalBlending;
  const dotOpacity = additive ? 0.85 : 0.75;

  return (
    <>
      <Stars density={density} mouse={mouse} color={accent} additive={additive} sprite={soft} reduced={reduced} />

      <group ref={group}>
        {/* invisible sphere: hides the dots on the far side so the globe reads as solid */}
        <mesh renderOrder={-1}>
          <sphereGeometry args={[R * 0.985, 48, 48]} />
          <meshBasicMaterial colorWrite={false} />
        </mesh>

        <points geometry={dots}>
          <pointsMaterial
            color={accent}
            map={disc}
            size={0.036}
            sizeAttenuation
            transparent
            opacity={dotOpacity}
            blending={blending}
            depthWrite={false}
          />
        </points>

        <lineSegments geometry={network}>
          <lineBasicMaterial color={accent2} transparent opacity={additive ? 0.32 : 0.4} blending={blending} depthWrite={false} />
        </lineSegments>

        <lineSegments geometry={arcGeo}>
          <lineBasicMaterial color={accent} transparent opacity={additive ? 0.5 : 0.65} blending={blending} depthWrite={false} />
        </lineSegments>

        <points geometry={markers}>
          <pointsMaterial color={accent3} map={soft} size={0.16} sizeAttenuation transparent opacity={1} blending={blending} depthWrite={false} />
        </points>

        <points geometry={hubGeo}>
          <pointsMaterial color={accent} map={soft} size={0.38} sizeAttenuation transparent opacity={1} blending={blending} depthWrite={false} />
        </points>

        <points geometry={pulses}>
          <pointsMaterial color={accent3} map={soft} size={0.17} sizeAttenuation transparent opacity={1} blending={blending} depthWrite={false} />
        </points>

        <HubPing color={accent} additive={additive} reduced={reduced} />

        {/* orbit rings, each carrying glowing satellites with comet tails */}
        <mesh ref={ringA} rotation={[Math.PI / 2.6, 0.2, 0]}>
          <torusGeometry args={[R * 1.28, 0.0045, 8, 220]} />
          <meshBasicMaterial color={accent2} transparent opacity={additive ? 0.5 : 0.55} blending={blending} depthWrite={false} />
          <Satellite radius={R * 1.28} speed={0.7} phase={0} color={accent} additive={additive} reduced={reduced} />
          <Satellite radius={R * 1.28} speed={0.7} phase={Math.PI} color={accent3} additive={additive} reduced={reduced} trail={24} />
        </mesh>
        <mesh ref={ringB} rotation={[Math.PI / 1.9, -0.35, 0]}>
          <torusGeometry args={[R * 1.45, 0.0035, 8, 240]} />
          <meshBasicMaterial color={accent} transparent opacity={additive ? 0.32 : 0.4} blending={blending} depthWrite={false} />
          <Satellite radius={R * 1.45} speed={-0.5} phase={1.7} color={accent2} additive={additive} reduced={reduced} trail={30} />
        </mesh>
      </group>
    </>
  );
}

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function Globe() {
  const mouse = useRef({ x: 0, y: 0 });
  const wrap = useRef<HTMLDivElement>(null);
  const [ok, setOk] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(true);
  const [density, setDensity] = useState(1);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setOk(webglAvailable());
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const setD = () => setDensity(window.innerWidth < 768 ? 0.55 : 1);
    setD();
    window.addEventListener("resize", setD);

    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("resize", setD);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  // stop rendering when the hero is scrolled out of view to save battery
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden="true">
      {ok === false && (
        <div className="absolute inset-0 grid place-items-center">
          <div
            className="h-[60%] w-[60%] rounded-full opacity-60 blur-2xl"
            style={{ background: "radial-gradient(circle at 35% 30%, var(--accent), var(--accent-2) 55%, transparent 72%)" }}
          />
        </div>
      )}
      {ok && (
        <Canvas
          dpr={[1, 1.75]}
          frameloop={visible ? "always" : "never"}
          camera={{ position: [0, 0, 5.4], fov: 45 }}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          style={{ pointerEvents: "none" }}
        >
          <Scene density={density} mouse={mouse} reduced={reduced} />
        </Canvas>
      )}
    </div>
  );
}
