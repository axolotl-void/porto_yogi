export default function HudOverlay() {
  return (
    <>
      <div className="scanlines"></div>

      <div className="hud-corner top-left"></div>
      <div className="hud-corner top-right"></div>
      <div className="hud-corner bottom-left"></div>
      <div className="hud-corner bottom-right"></div>

      <div className="sys-status">
        SYS_ONLINE: TRUE <br />
        CPU_LOAD: OPTIMAL <br />
        PILOT: YOGI.P
      </div>
    </>
  );
}
