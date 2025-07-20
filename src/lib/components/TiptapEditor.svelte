<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import type { Editor as EditorType } from '@tiptap/core';

  export let value: string;

  let element: HTMLElement;
  let editor: EditorType;

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [
        StarterKit,
      ],
      content: value,
      onUpdate: () => {
        value = editor.getHTML();
      },
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

<div class="border rounded p-2">
  <div class="flex space-x-2 mb-2">
    <button on:click={() => editor.chain().focus().toggleBold().run()} class:is-active={editor?.isActive('bold')}>
      Bold
    </button>
    <button on:click={() => editor.chain().focus().toggleItalic().run()} class:is-active={editor?.isActive('italic')}>
      Italic
    </button>
    <button on:click={() => editor.chain().focus().toggleStrike().run()} class:is-active={editor?.isActive('strike')}>
      Strike
    </button>
  </div>
  <div bind:this={element}></div>
</div>

<style>
  .is-active {
    background-color: #333;
    color: #fff;
  }
</style>
