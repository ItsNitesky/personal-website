'use client';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#0A0118] overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#2C0B4F_0%,_#0A0118_50%)] opacity-80" />

      <div className="absolute inset-0 stars-background" />

      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent" />

      <div className="max-w-3xl text-center space-y-6 relative z-10">
        <h1 className="text-8xl font-extrabold tracking-tight">
          <span className="text-white page-text">Hi, I&apos;m </span>
          <span className="inline-block">
            <span className="magical-text">
              Brant
            </span>
          </span>
        </h1>

        <h2 className="text-3xl font-semibold magical-text-subtle">
          Community & Content Marketing Professional
        </h2>

        <p className="text-xl text-purple-100/90 max-w-2xl mx-auto mt-4 leading-relaxed selection:bg-purple-500/30 selection:text-white page-text">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Ligula finibus ligula ex porttitor pretium phasellus. Lobortis maecenas euismod eget massa id.
        </p>
      </div>
    </main>
  );
}
