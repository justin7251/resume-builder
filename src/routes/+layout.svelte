<script>
  import "../app.css";
</script>

<div class="min-h-screen bg-gray-100">
  <header class="bg-blue-600 text-white shadow-lg">
    <div class="container mx-auto px-4 py-4">
      <nav class="flex justify-between items-center">
        <a href="/" class="text-2xl font-bold">Resume Builder</a>
        <div class="space-x-4">
          <a href="/" class="hover:underline">Home</a>
          <a href="/templates" class="hover:underline">Templates</a>
        </div>
      </nav>
    </div>
  </header>

  <main class="container mx-auto px-4 py-8">
    <slot />
  </main>

  <footer class="bg-gray-800 text-white py-6">
    <div class="container mx-auto px-4 text-center">
      <p>© {new Date().getFullYear()} Resume Builder. All rights reserved.</p>
    </div>
  </footer>
</div>