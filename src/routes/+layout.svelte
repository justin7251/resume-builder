<script>
  import "../app.css";
  let mobileMenuOpen = false;
</script>

<div class="min-h-screen bg-gray-100">
  <header class="bg-white text-slate-900 border-b border-slate-200">
    <div class="container mx-auto px-4 py-4">
      <nav class="flex items-center justify-between">
        <a href="/" class="text-2xl font-bold">Resume Builder</a>
        <div class="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <a href="/" class="hover:underline">Home</a>
          <a href="/templates" class="hover:underline">Templates</a>
          <a href="/builder" class="hover:underline">Builder</a>
          <a href="/pricing" class="hover:underline">Pricing</a>
          <a href="/resources" class="hover:underline">Resources</a>
        </div>
        <div class="hidden md:flex items-center gap-4 text-sm text-slate-600">
          <a href="/login" class="hover:text-slate-900">Login</a>
          <a
            href="/builder"
            class="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700"
          >
            Create Resume
          </a>
        </div>
        <button
          class="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-slate-200 text-slate-600"
          aria-label="Toggle navigation"
          on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
          type="button"
        >
          <span class="text-xl leading-none">{mobileMenuOpen ? 'Close' : 'Menu'}</span>
        </button>
      </nav>
      {#if mobileMenuOpen}
        <div class="md:hidden mt-4 rounded-xl bg-white text-slate-700 p-4 shadow-lg border border-slate-200">
          <div class="flex flex-col gap-3 text-sm">
            <a href="/" class="hover:text-slate-900">Home</a>
            <a href="/templates" class="hover:text-slate-900">Templates</a>
            <a href="/builder" class="hover:text-slate-900">Builder</a>
            <a href="/pricing" class="hover:text-slate-900">Pricing</a>
            <a href="/resources" class="hover:text-slate-900">Resources</a>
            <a href="/login" class="hover:text-slate-900">Login</a>
            <a
              href="/builder"
              class="mt-2 inline-flex items-center justify-center rounded-full h-10 px-5 bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
            >
              Create Resume
            </a>
          </div>
        </div>
      {/if}
    </div>
  </header>

  <main class="container mx-auto px-4 py-8">
    <slot />
  </main>

  <footer class="border-t border-slate-200 py-10 bg-white">
  <div class="container mx-auto px-4 grid md:grid-cols-4 gap-8 text-sm text-slate-600">
    <div>
      <div class="font-display font-semibold text-slate-900 mb-2">Resume Builder</div>
      <p>Build resumes that get noticed by recruiters and hiring managers.</p>
    </div>
    <div>
      <div class="font-semibold text-slate-900 mb-2">Product</div>
      <ul class="space-y-2">
        <li><a href="/templates" class="hover:text-slate-900">Resume Templates</a></li>
        <li><a href="/builder" class="hover:text-slate-900">Resume Builder</a></li>
        <li><a href="/pricing" class="hover:text-slate-900">Pricing</a></li>
      </ul>
    </div>
    <div>
      <div class="font-semibold text-slate-900 mb-2">Support</div>
      <ul class="space-y-2">
        <li><a href="/faq" class="hover:text-slate-900">FAQs</a></li>
        <li><a href="/contact" class="hover:text-slate-900">Contact Us</a></li>
        <li><a href="/blog" class="hover:text-slate-900">Blog</a></li>
      </ul>
    </div>
    <div>
      <div class="font-semibold text-slate-900 mb-2">Legal</div>
      <ul class="space-y-2">
        <li><a href="/privacy" class="hover:text-slate-900">Privacy Policy</a></li>
        <li><a href="/terms" class="hover:text-slate-900">Terms of Service</a></li>
        <li><a href="/cookies" class="hover:text-slate-900">Cookie Policy</a></li>
      </ul>
    </div>
  </div>
  <div class="container mx-auto px-4 mt-8 text-center text-xs text-slate-500">
    © {new Date().getFullYear()} Resume Builder. All rights reserved.
  </div>
</footer>
</div>



