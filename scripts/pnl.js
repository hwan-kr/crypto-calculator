// 현재 포지션 상태를 관리하는 변수
let currentPosition = "long"; // 기본값은 롱으로 설정

// 롱과 숏 버튼의 상태를 토글하는 함수
function togglePosition(position) {
    currentPosition = position;
    // 버튼의 클래스를 업데이트하여 시각적으로 표시
    document.getElementById("longButton").classList.remove("active");
    document.getElementById("shortButton").classList.remove("active");
    document.getElementById(`${position}Button`).classList.add("active");
}

// 롱 버튼 클릭 이벤트 핸들러
document.getElementById("longButton").addEventListener("click", function () {
    togglePosition("long");
});

// 숏 버튼 클릭 이벤트 핸들러
document.getElementById("shortButton").addEventListener("click", function () {
    togglePosition("short");
});

// PNL 계산 함수
function calculatePNL() {
    // 폼 입력 값을 가져옴
    const entryPrice = parseFloat(document.getElementById("entryPrice").value);
    const exitPrice = parseFloat(document.getElementById("exitPrice").value);
    const quantity = parseFloat(document.getElementById("quantity").value);
    const leverage = parseFloat(document.getElementById("leverage").value);
    const entryFeeRate =
        parseFloat(document.getElementById("entryFee").value) / 100;
    const exitFeeRate =
        parseFloat(document.getElementById("exitFee").value) / 100;
    const positionSize = (quantity * leverage) / entryPrice;
    const exitFee = exitPrice * positionSize * exitFeeRate;
    const entryFee = entryPrice * positionSize * entryFeeRate;
    // 입력 값 검증
    if (
        isNaN(entryPrice) ||
        isNaN(exitPrice) ||
        isNaN(quantity) ||
        isNaN(leverage)
    ) {
        document.getElementById("result").textContent =
            "Please enter valid numbers.";
        return;
    }

    // PNL 계산
    let pnl;
    if (currentPosition === "long") {
        pnl =
            exitPrice * positionSize -
            exitFee -
            (entryPrice * positionSize + entryFee);
    } else {
        pnl =
            entryPrice * positionSize -
            entryFee -
            (exitPrice * positionSize + exitFee);
    }

    // 결과 표시
    document.getElementById("result").textContent = `PNL: ${pnl.toFixed(
        2
    )} | Paid Fee : ${entryFee + exitFee}`;
}

// 초기 롱 포지션 활성화
togglePosition("long");
