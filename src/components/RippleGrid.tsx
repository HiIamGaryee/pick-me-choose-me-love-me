import { Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef } from "react";
import "./RippleGrid.css";

type Props = {
  enableRainbow?: boolean;
  gridColor?: string;
  rippleIntensity?: number;
  gridSize?: number;
  gridThickness?: number;
  fadeDistance?: number;
  vignetteStrength?: number;
  glowIntensity?: number;
  opacity?: number;
  gridRotation?: number;
  mouseInteraction?: boolean;
  mouseInteractionRadius?: number;
};

const RippleGrid: React.FC<Props> = ({
  enableRainbow = false,
  gridColor = "#ffffff",
  rippleIntensity = 0.05,
  gridSize = 10.0,
  gridThickness = 15.0,
  fadeDistance = 1.5,
  vignetteStrength = 2.0,
  glowIntensity = 0.1,
  opacity = 1.0,
  gridRotation = 0,
  mouseInteraction = true,
  mouseInteractionRadius = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  //   const mousePositionRef = useRef({ x: 0.5, y: 0.5 });
  //   const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  //   const mouseInfluenceRef = useRef(0);
  const uniformsRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const hexToRgb = (hex: string): [number, number, number] => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? [
            parseInt(result[1], 16) / 255,
            parseInt(result[2], 16) / 255,
            parseInt(result[3], 16) / 255,
          ]
        : [1, 1, 1];
    };

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
    });
    const gl = renderer.gl;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    containerRef.current.appendChild(gl.canvas);

    const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
}`;

    const frag = `precision highp float;
uniform float iTime;
uniform vec2 iResolution;
uniform bool enableRainbow;
uniform vec3 gridColor;
uniform float rippleIntensity;
uniform float gridSize;
uniform float gridThickness;
uniform float fadeDistance;
uniform float vignetteStrength;
uniform float glowIntensity;
uniform float opacity;
uniform float gridRotation;
uniform bool mouseInteraction;
uniform vec2 mousePosition;
uniform float mouseInfluence;
uniform float mouseInteractionRadius;
varying vec2 vUv;

float pi = 3.141592;

mat2 rotate(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;
    if (gridRotation != 0.0) {
        uv = rotate(gridRotation * pi / 180.0) * uv;
    }
    float dist = length(uv);
    float func = sin(pi * (iTime - dist));
    vec2 rippleUv = uv + uv * func * rippleIntensity;
    vec2 a = sin(gridSize * 0.5 * pi * rippleUv - pi / 2.0);
    vec2 b = abs(a);
    float aaWidth = 0.5;
    vec2 smoothB = vec2(
        smoothstep(0.0, aaWidth, b.x),
        smoothstep(0.0, aaWidth, b.y)
    );
    vec3 color = vec3(0.0);
    color += exp(-gridThickness * smoothB.x);
    color += exp(-gridThickness * smoothB.y);
    if (glowIntensity > 0.0) {
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.x);
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.y);
    }
    vec3 t = enableRainbow
        ? vec3(sin(iTime) * 0.5 + 0.5, cos(iTime) * 0.5 + 0.5, 1.0)
        : gridColor;
    gl_FragColor = vec4(color * t * opacity, length(color) * opacity);
}`;

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: [1, 1] },
      enableRainbow: { value: enableRainbow },
      gridColor: { value: hexToRgb(gridColor) },
      rippleIntensity: { value: rippleIntensity },
      gridSize: { value: gridSize },
      gridThickness: { value: gridThickness },
      fadeDistance: { value: fadeDistance },
      vignetteStrength: { value: vignetteStrength },
      glowIntensity: { value: glowIntensity },
      opacity: { value: opacity },
      gridRotation: { value: gridRotation },
      mouseInteraction: { value: mouseInteraction },
      mousePosition: { value: [0.5, 0.5] },
      mouseInfluence: { value: 0 },
      mouseInteractionRadius: { value: mouseInteractionRadius },
    };

    uniformsRef.current = uniforms;

    const geometry = new Triangle(gl);
    const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = containerRef.current!;
      renderer.setSize(w, h);
      uniforms.iResolution.value = [w, h];
    };
    resize();
    window.addEventListener("resize", resize);

    const render = (t: number) => {
      uniforms.iTime.value = t * 0.001;
      renderer.render({ scene: mesh });
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      renderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
      containerRef.current?.removeChild(gl.canvas);
    };
  }, []);

  return <div ref={containerRef} className="ripple-grid-container" />;
};

export default RippleGrid;
