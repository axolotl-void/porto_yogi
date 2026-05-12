import HoloParticleField from "./HoloParticleField";
import HoloBase from "./HoloBase";
import HoloProjection from "./HoloProjection";

/**
 * HoloStage
 * - Wrapper semua elemen hologram
 * - Urutan render dijaga (base → particle → photo)
 */
export default function HoloStage({ state, image }) {
  return (
    <div
      style={{
        position: "relative",
        width: 260,
        height: 360,
        pointerEvents: "none",
      }}
    >
      {/* BASE (ENERGY + BEAM) */}
      <HoloBase state={state} />

      {/* PARTICLE FIELD */}
      <div style={{ position: "absolute", bottom: 0 }}>
        <HoloParticleField state={state} />
      </div>

      {/* PHOTO PROJECTION */}
      <HoloProjection state={state} src={image} />
    </div>
  );
}
