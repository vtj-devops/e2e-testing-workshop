const { useState, useEffect } = React;

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    // 簡易認証（デモ用）
    const validUser = 'admin';
    const validPass = 'password';
    if (username === validUser && password === validPass) {
      onLogin({ username });
    } else {
      setError('ユーザー名かパスワードが違います');
    }
  }

  return (
    <div className="card">
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ユーザー名
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="username"
            required
          />
        </label>
        <label>
          パスワード
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="password"
            required
          />
        </label>
        {error && <div className="error" role="alert">{error}</div>}
        <button type="submit">ログイン</button>
      </form>
      <div className="hint">デモ用: ユーザー名 <strong>admin</strong> / パスワード <strong>password</strong></div>
    </div>
  );
}

function Dashboard({ user, onLogout }) {
  const [secretVisible, setSecretVisible] = useState(false);
  return (
    <div className="card">
      <h2>ようこそ、{user.username}さん</h2>
      <p>これは保護されたダッシュボードページのサンプルです。</p>
      <button onClick={() => setSecretVisible((s) => !s)}>
        {secretVisible ? '秘密を隠す' : '秘密を表示'}
      </button>
      {secretVisible && <pre className="secret">シークレットデータ: 42-SECRET</pre>}
      <div style={{ marginTop: '12px' }}>
        <button className="secondary" onClick={onLogout}>ログアウト</button>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem('simple-react-auth');
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch (e) {
        localStorage.removeItem('simple-react-auth');
      }
    }
  }, []);

  function handleLogin(u) {
    setUser(u);
    localStorage.setItem('simple-react-auth', JSON.stringify(u));
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem('simple-react-auth');
  }

  return (
    <div className="app">
      <header>
        <h1>E2E Workshop - Simple React Login</h1>
      </header>
      <main>
        {!user ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Dashboard user={user} onLogout={handleLogout} />
        )}
      </main>
      <footer>
        <small>クライアントサイドのみの簡易デモです（認証はハードコードされています）</small>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
