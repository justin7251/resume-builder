<div class="resume-page">
  <slot></slot>
</div>

<style>
  .resume-page {
    width: 210mm;
    height: 297mm;
    padding: 20mm;
    box-sizing: border-box;
    background: white;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
    margin-bottom: 1cm;
  }

  .printing .resume-page {
    box-shadow: none;
    margin: 0;
  }
</style>
