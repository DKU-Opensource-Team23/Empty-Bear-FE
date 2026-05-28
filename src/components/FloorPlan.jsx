import { useEffect, useState } from "react";

const STATUS_COLORS = {
  available: "#12b76a",
  soon:      "#fdb022",
  busy:      "#f04438",
};

/**
 * @param {string} svgUrl
 * @param {Array}  classrooms
 */

function FloorPlanSvg({ svgUrl, classrooms }) {
  const [svgContent, setSvgContent] = useState(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(false);

  useEffect(() => {
    if (!svgUrl) return;

    setLoading(true);
    setError(false);
    setSvgContent(null);

    fetch(svgUrl)
      .then((res) => {
        if (!res.ok) throw new Error("SVG fetch failed");
        return res.text();
      })
      .then((text) => {
        const parser = new DOMParser();
        const doc    = parser.parseFromString(text, "image/svg+xml");

        if (doc.querySelector("parsererror")) throw new Error("SVG parse error");

        const svgEl = doc.querySelector("svg");
        if (!svgEl) throw new Error("No <svg> found");

        svgEl.setAttribute("width",  "100%");
        svgEl.setAttribute("height", "100%");

        /* ── roomName → status 빠른 탐색용 Map ── */
        const roomMap = new Map(classrooms.map((c) => [c.roomName, c.status]));

        const textElements = Array.from(svgEl.querySelectorAll("text"));

        textElements.forEach((textEl) => {
          const label = textEl.textContent?.trim();
          if (!label) return;

          const status = roomMap.get(label);
          if (!status) return;

          const color = STATUS_COLORS[status];
          if (!color) return;

          const cell = textEl.closest("[data-cell-id]");
          if (!cell) return;

          const rect = cell.querySelector("rect");
          if (!rect) return;

          rect.setAttribute("fill",         color);
          rect.setAttribute("fill-opacity", "0.72");
        });

        const serializer = new XMLSerializer();
        setSvgContent(serializer.serializeToString(svgEl));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [svgUrl, classrooms]);

  if (loading) {
    return (
      <div style={centerStyle}>
        <span style={hintStyle}>평면도 불러오는 중…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div style={centerStyle}>
        <span style={hintStyle}>평면도 준비 중</span>
      </div>
    );
  }

  return (
    <div
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}

const centerStyle = { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" };
const hintStyle   = { color: "#9fb3c8", fontSize: 13 };

export default FloorPlanSvg;
