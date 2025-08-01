<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import Underline from '@tiptap/extension-underline';
  import type { Editor as EditorType } from '@tiptap/core';

  export let value: string;

  let element: HTMLElement;
  let editor: EditorType;
  const dispatch = createEventDispatcher();

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [
        StarterKit,
        Underline,
      ],
      content: value,
      onUpdate: () => {
        value = editor.getHTML();
        dispatch('change');
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
    <button on:click={() => editor.chain().focus().toggleUnderline().run()} class:is-active={editor?.isActive('underline')}>
      Underline
    </button>
    <button on:click={() => editor.chain().focus().toggleBulletList().run()} class:is-active={editor?.isActive('bulletList')}>
      Bullet List
    </button>
    <button on:click={() => editor.chain().focus().toggleOrderedList().run()} class:is-active={editor?.isActive('orderedList')}>
      Ordered List
    </button>
  </div>
  <div bind:this={element} class="tiptap"></div>
</div>

<style>
  .is-active {
    background-color: #333;
    color: #fff;
  }
</style>
