export function calculateProgress(_startDate: string, _expiredDate: string) {
  const today = new Date().getTime(); // 현재 날짜
  const startDate = new Date(_startDate).getTime();
  const expiredDate = new Date(_expiredDate).getTime();

  // 시작 날짜와 만료 날짜 사이의 총 일 수 계산
  const totalDays = expiredDate - startDate;

  // 현재 날짜와 시작 날짜 사이의 경과 일 수 계산
  const elapsedDays = today - startDate;

  // 진행 상태 계산 (백분율)
  const progressPercentage = (elapsedDays / totalDays) * 100;

  return Math.floor(progressPercentage);
}
