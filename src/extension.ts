import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('한국학 공구서 익스텐션이 활성화되었습니다.');

    // 사이드바 웹뷰 프로바이더 등록
    const provider = new HanhubViewProvider(context.extensionUri);

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            'hanhub.dictView',
            provider,
            {
                webviewOptions: {
                    retainContextWhenHidden: true
                }
            }
        )
    );

    // 명령어 등록
    context.subscriptions.push(
        vscode.commands.registerCommand('hanhub.openDict', () => {
            provider.switchTab('dict');
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('hanhub.openChronology', () => {
            provider.switchTab('chronology');
        })
    );
}

class HanhubViewProvider implements vscode.WebviewViewProvider {
    private _view?: vscode.WebviewView;

    constructor(private readonly _extensionUri: vscode.Uri) {}

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        // 웹뷰에서 메시지 수신
        webviewView.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {
                    case 'switchTab':
                        // 탭 전환 시 상태 저장 등 필요한 작업
                        break;
                }
            }
        );
    }

    public switchTab(tab: 'dict' | 'chronology') {
        if (this._view) {
            this._view.webview.postMessage({ command: 'switchTab', tab });
        }
    }

    private _getHtmlForWebview(webview: vscode.Webview): string {
        return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; frame-src https://dict.hanhub.click https://chronology.hanhub.click; style-src 'unsafe-inline'; script-src 'unsafe-inline';">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        html, body {
            height: 100%;
            overflow: hidden;
            font-family: var(--vscode-font-family);
            background: var(--vscode-sideBar-background);
        }
        .tabs {
            display: flex;
            background: var(--vscode-activityBar-background, #6366f1);
            height: 36px;
            border-bottom: 1px solid var(--vscode-sideBar-border);
        }
        .tab {
            flex: 1;
            border: none;
            background: transparent;
            color: var(--vscode-activityBar-inactiveForeground, rgba(255,255,255,0.7));
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            padding: 0 8px;
        }
        .tab:hover {
            background: var(--vscode-toolbar-hoverBackground, rgba(255,255,255,0.1));
        }
        .tab.active {
            color: var(--vscode-activityBar-foreground, white);
            background: var(--vscode-toolbar-activeBackground, rgba(255,255,255,0.2));
            border-bottom: 2px solid var(--vscode-focusBorder, #007acc);
        }
        .iframe-container {
            height: calc(100% - 36px);
            position: relative;
            background: white;
        }
        iframe {
            width: 100%;
            height: 100%;
            border: none;
            position: absolute;
            top: 0;
            left: 0;
        }
        iframe.hidden {
            display: none;
        }
        .loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: var(--vscode-foreground);
            font-size: 13px;
        }
    </style>
</head>
<body>
    <div class="tabs">
        <button class="tab active" data-target="dict">한국학 웹 사전</button>
        <button class="tab" data-target="chronology">동양연표</button>
    </div>
    <div class="iframe-container">
        <div class="loading" id="loading">로딩 중...</div>
        <iframe id="dict" src="https://dict.hanhub.click/?embed=true" onload="hideLoading()"></iframe>
        <iframe id="chronology" class="hidden" src="https://chronology.hanhub.click/?embed=true"></iframe>
    </div>
    <script>
        const vscode = acquireVsCodeApi();
        const tabs = document.querySelectorAll('.tab');
        const iframes = document.querySelectorAll('iframe');
        const loading = document.getElementById('loading');

        function hideLoading() {
            if (loading) loading.style.display = 'none';
        }

        function switchTab(target) {
            tabs.forEach(t => t.classList.toggle('active', t.dataset.target === target));
            iframes.forEach(iframe => {
                iframe.classList.toggle('hidden', iframe.id !== target);
            });
        }

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.target;
                switchTab(target);
                vscode.postMessage({ command: 'switchTab', tab: target });
            });
        });

        // VSCode에서 메시지 수신
        window.addEventListener('message', event => {
            const message = event.data;
            if (message.command === 'switchTab') {
                switchTab(message.tab);
            }
        });
    </script>
</body>
</html>`;
    }
}

export function deactivate() {}
