(function () {
  function initStructureCheck() {
    const root = document.getElementById("structure-check-app");
    if (!root || root.dataset.initialized === "true") return;

    root.dataset.initialized = "true";

    function countChecked(selector) {
      return root.querySelectorAll(selector + ":checked").length;
    }

    function diagnose() {
      const cost = countChecked(".sc-cost");
      const price = countChecked(".sc-price");
      const decision = countChecked(".sc-decision");
      const total = cost + price + decision;

      const resultCard = root.querySelector('[data-role="result"]');
      const badge = root.querySelector('[data-role="badge"]');
      const title = root.querySelector('[data-role="title"]');
      const summary = root.querySelector('[data-role="summary"]');
      const detail = root.querySelector('[data-role="detail"]');

      root.querySelector('[data-role="cost-score"]').textContent = `${cost} / 5`;
      root.querySelector('[data-role="price-score"]').textContent = `${price} / 5`;
      root.querySelector('[data-role="decision-score"]').textContent = `${decision} / 5`;

      badge.className = "sc-badge";

      if (total <= 3) {
        badge.classList.add("ok");
        badge.textContent = "強い構造";
        title.textContent = `判定：強い構造（YES ${total} 個）`;
        summary.textContent = "すでにインフレ耐性があり、環境変化を利益に変えられる可能性が高い状態です。";
        detail.textContent = "コストの重さ、価格競争、意思決定の遅さのいずれも比較的軽く、変化に対応しやすい構造です。";
      } else if (total <= 8) {
        badge.classList.add("mid");
        badge.textContent = "グレーゾーン";
        title.textContent = `判定：グレーゾーン（YES ${total} 個）`;
        summary.textContent = "問題は認識できる状態ですが、変えられるかどうかで今後の差が開きます。";
        detail.textContent = "いまはまだ致命傷ではありませんが、放置するとコスト上昇や競争激化の影響を受けやすくなります。";
      } else {
        badge.classList.add("bad");
        badge.textContent = "弱い構造";
        title.textContent = `判定：弱い構造（YES ${total} 個）`;
        summary.textContent = "コスト上昇をそのまま受けやすく、利益が圧迫されやすい状態です。";
        detail.textContent = "人手依存、価格決定力の弱さ、意思決定の遅さが重なると、環境変化を利益ではなく負担として受け取りやすくなります。";
      }

      resultCard.classList.add("show");
      resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    function resetForm() {
      root.querySelectorAll(".sc-q").forEach((el) => {
        el.checked = false;
      });
      root.querySelector('[data-role="result"]').classList.remove("show");
    }

    root.addEventListener("click", function (e) {
      const role = e.target && e.target.dataset ? e.target.dataset.role : null;
      if (role === "diagnose") diagnose();
      if (role === "reset") resetForm();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initStructureCheck);
  } else {
    initStructureCheck();
  }

  setTimeout(initStructureCheck, 300);
})();