# 한국학 공구서 - VSCode Extension

VSCode 사이드바에서 한국학 공구서(동양연표, 한국학 웹 사전)를 바로 사용할 수 있는 익스텐션입니다.

## 기능

- **한국학 웹 사전**: 한어대사전, 이두, 한의학 용어 등 다양한 한국학 관련 사전 검색
- **동양연표**: 동양 역사 연표 조회

## 설치 방법

### Marketplace에서 설치 (권장)

1. VS Code 확장 탭에서 `한국학 공구서` 검색
2. 또는 [Marketplace 페이지](https://marketplace.visualstudio.com/items?itemName=KoreanStudiesTool.hanhub-dict)에서 설치

### VSIX 파일로 설치

1. [Releases](https://github.com/lee-han/vscode-extension-dict/releases)에서 `.vsix` 파일 다운로드
2. VS Code에서 `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`) > `Extensions: Install from VSIX...`
3. 다운로드한 `.vsix` 파일 선택

## 사용법

1. 설치 후 왼쪽 Activity Bar에서 **漢** 아이콘 클릭
2. 사이드바에서 탭을 클릭하여 한국학 웹 사전 / 동양연표 전환

## 개발

### 로컬 실행

```bash
# 의존성 설치
npm install

# 컴파일
npm run compile

# VS Code에서 F5를 눌러 디버그 모드로 실행
```

### 빌드

```bash
# VSIX 패키지 생성
npm run package
```

### 배포

#### 1. Publisher 생성

https://marketplace.visualstudio.com/manage 에서 Publisher 생성

#### 2. Personal Access Token (PAT) 발급

1. https://dev.azure.com 접속 (조직이 없으면 먼저 생성)
2. User Settings > Personal access tokens > New Token
3. 설정:
   - Organization: `All accessible organizations`
   - Scopes: `Show all scopes` > Marketplace > `Manage` 체크

#### 3. 로그인 및 배포

```bash
# 로그인 (토큰 입력)
npx vsce login <publisher-id>

# 배포
npx vsce publish
```

버전 업데이트 시 `package.json`의 `version` 값을 변경 후 재배포

## 요구사항

- VS Code 1.74.0 이상

## 관련 링크

- [한국학 웹 사전](https://dict.hanhub.click/)
- [동양연표](https://chronology.hanhub.click/)
- [GitHub 저장소](https://github.com/lee-han/vscode-extension-dict)
- [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=KoreanStudiesTool.hanhub-dict)

## 라이선스

MIT License
