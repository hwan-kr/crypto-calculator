// 롱/숏 포지션 선택
let selectedPosition = 'long'; // 기본값
document.getElementById('longButton').addEventListener('click', function () {
    setSelectedPosition('long');
});
document.getElementById('shortButton').addEventListener('click', function () {
    setSelectedPosition('short');
});

function setSelectedPosition(position) {
    selectedPosition = position;
    document.getElementById('longButton').classList.remove('active');
    document.getElementById('shortButton').classList.remove('active');
    document.getElementById(position + 'Button').classList.add('active');
}

// 수량 타입(USDT/Units) 선택
let selectedQuantityType = 'usdt'; // 기본값
document.getElementById('usdtButton').addEventListener('click', function () {
    setSelectedQuantityType('usdt');
});
document.getElementById('unitsButton').addEventListener('click', function () {
    setSelectedQuantityType('units');
});

function setSelectedQuantityType(type) {
    selectedQuantityType = type;
    document.getElementById('usdtButton').classList.remove('active');
    document.getElementById('unitsButton').classList.remove('active');
    document.getElementById(type + 'Button').classList.add('active');
}

// PNL 계산
function calculatePNL() {
    const entryPrice = parseFloat(document.getElementById('entryPrice').value);
    const exitPrice = parseFloat(document.getElementById('exitPrice').value);
    let quantity = parseFloat(document.getElementById('quantity').value); // 수량을 입력받음
    const entryFeePercent = parseFloat(document.getElementById('entryFee').value) / 100;
    const exitFeePercent = parseFloat(document.getElementById('exitFee').value) / 100;
    const leverage = parseFloat(document.getElementById('leverage').value);

    if (isNaN(entryPrice) || isNaN(exitPrice) || isNaN(quantity) || isNaN(leverage)) {
        alert('Please enter valid numbers for all fields.');
        return;
    }

    // USDT 선택 시, 실제 코인/토큰의 수량을 계산
    if (selectedQuantityType === 'usdt') {
        quantity = quantity / entryPrice;
    }

    const entryFee = entryPrice * quantity * entryFeePercent;
    const exitFee = exitPrice * quantity * exitFeePercent;
    const pnl = selectedPosition === 'long' ?
        ((exitPrice - entryPrice) * quantity - entryFee - exitFee) * leverage :
        ((entryPrice - exitPrice) * quantity - entryFee - exitFee) * leverage;

    document.getElementById('result').innerText = `PNL: ${pnl.toFixed(2)}`;
}


// 계산 버튼 이벤트 리스너 추가
document.querySelector('.button').addEventListener('click', calculatePNL);
