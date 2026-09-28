export default function Loading() {
  return (
    <main className="container page-main" aria-busy="true">
      <div className="page-intro" role="status">
        <p className="eyebrow">
          <span />
          One moment
        </p>
        <p className="lead" style={{ marginTop: 22 }}>
          Getting the page ready…
        </p>
      </div>
    </main>
  );
}
