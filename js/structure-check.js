document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById('structure-check-app');
  if (!root) return;

  function countChecked(selector) {
    return root.querySelectorAll(selector + ':checked').length;
  }

  function diagnose() {
    const cost = countChecked('.cost');
    const price = countChecked('.price');
    const decision = countChecked('.decision');
    const total = cost + price + decision;

    const resultCard = root.querySelector('#resultCard');
    const badge = root.querySelector('#resultBadge');
    const title = root.querySelector('#resultTitle');
    const summary = root.querySelector('#resultSummary');
    const detail = root.querySelector('#resultDetail');

    root.querySelector('#costScore').textContent = `${cost} / 5`;
    root.querySelector('#priceScore').textContent = `${price} / 5`;
    root.querySelector('#decisionScore').textContent = `${decision} / 5`;

    badge.className = 'badge';

    if (total <= 3) {
      badge.classList.add('ok');
      badge.textContent = '強い構造';
      title.textContent = `判定：強い構造（YES ${total} 個）`;
      summary.textContent = '環境変化を利益に変えられる構造です';
      detail.textContent = '軽い構造で変化に対応しやすい状態です';
    } else if (total <= 8) {
      badge.classList.add('mid');
      badge.textContent = 'グレーゾーン';
      title.textContent = `判定：グレーゾーン（YES ${total} 個）`;
      summary.textContent = '変えられるかが分岐点です';
      detail.textContent = 'ボトルネックを特定することが重要です';
    } else {
      badge.classList.add('bad');
      badge.textContent = '弱い構造';
      title.textContent = `判定：弱い構造（YES ${total} 個）`;
      summary.textContent = '利益が圧迫されやすい状態です';
      detail.textContent = '構造的な改善が必要です';
    }

    resultCard.classList.add('show');
  }

  function resetForm() {
    root.querySelectorAll('.q').forEach(el => el.checked = false);
    root.querySelector('#resultCard').classList.remove('show');
  }

  root.querySelector('#diagnoseBtn').addEventListener('click', diagnose);
  root.querySelector('#resetBtn').addEventListener('click', resetForm);
});
