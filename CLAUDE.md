# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 사용 언어

- 모든 대화나 주석에는 항상 한국어를 사용해야 한다.

## 코드 작성 기조

- **Fast Failure**: 에러가 나야할 곳에서는 확실하게 에러가 나야 한다. 내가 지정하지 않은 기본값이 들어가면 절대 안 된다.
- **하드코딩 최소화**: 가능하다면 별도의 상수 파일에 값을 넣고 연동해서 사용해야 한다.
- **경로 표기 방식**: 절대경로를 우선한다.
- **임의 로직 변경 금지**: 샘플 데이터와 기대값을 주었을 때는 이해를 돕기 위한 예시로만 사용한다. 임의로 로직이나 수식을 변경하여 억지 결과를 만들면 안 된다.
- **에러 로그 통일**: 에러의 내용을 출력할 때는 단순히 '에러:'라는 단어에 내용을 붙여 출력한다.

## .gitignore에 자동 추가
```
### 맥 ###
.DS_Store
._.DS_Store
**/.DS_Store
**/._.DS_Store
```

## 컬러 테마 관련 코드 수정 금지

**절대 수정 금지**: `layouts/partials/header.html` 및 `layouts/partials/footer.html`의 테마 관련 코드는 절대 수정하지 말아야 한다.

### 이유
- 테마 전환은 반드시 `document.documentElement.setAttribute("data-theme", "dark/light")` 방식을 사용해야 한다.
- `document.body.classList.add/remove('dark')` 방식으로 변경하면 CSS와의 호환성 문제로 테마가 작동하지 않는다.

### 보호 대상 코드
1. **header.html**: 페이지 로드 시 테마 초기화 스크립트
2. **footer.html**: 테마 토글 버튼 클릭 이벤트 핸들러

### 예외 상황
- 테마 기능을 완전히 새로 구현하는 경우에만 수정 가능
- 그 외 다른 기능 추가나 스타일 변경 시에는 테마 관련 코드를 절대 건드리지 말 것

## 공통 리소스 사용 규칙

- **common 폴더 우선 적용**: common 폴더에 있는 CSS와 JS를 우선 적용한다.
- **CSS 통합**: CSS는 `common/common.css`에 통합하여 작성한다.
- **한자 정규화 적용**: 텍스트 데이터를 입력받은 경우에는 모두 `hanja-normalizer.js`를 적용한다. 단, 명시적으로 제외한 경우에는 적용하지 않는다.
- **파스텔톤 색상**: 디자인에서 색상은 눈이 편한 파스텔톤으로 적용한다.