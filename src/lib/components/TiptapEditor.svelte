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

  $: if (editor && value !== editor.getHTML()) {
    editor.commands.setContent(value || '', false);
  }

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

<div class="border rounded p-2 tiptap-wrapper">
  <div class="flex space-x-2 mb-2">
    <button
      on:click={() => editor?.chain().focus().toggleBold().run()}
      class:is-active={editor?.isActive('bold')}
      class:opacity-50={!editor}
      class:cursor-not-allowed={!editor}
      disabled={!editor}
    >
      Bold
    </button>
    <button
      on:click={() => editor?.chain().focus().toggleItalic().run()}
      class:is-active={editor?.isActive('italic')}
      class:opacity-50={!editor}
      class:cursor-not-allowed={!editor}
      disabled={!editor}
    >
      Italic
    </button>
    <button
      on:click={() => editor?.chain().focus().toggleStrike().run()}
      class:is-active={editor?.isActive('strike')}
      class:opacity-50={!editor}
      class:cursor-not-allowed={!editor}
      disabled={!editor}
    >
      Strike
    </button>
    <button
      on:click={() => editor?.chain().focus().toggleUnderline().run()}
      class:is-active={editor?.isActive('underline')}
      class:opacity-50={!editor}
      class:cursor-not-allowed={!editor}
      disabled={!editor}
    >
      Underline
    </button>
    <button
      on:click={() => editor?.chain().focus().toggleBulletList().run()}
      class:is-active={editor?.isActive('bulletList')}
      class:opacity-50={!editor}
      class:cursor-not-allowed={!editor}
      disabled={!editor}
    >
      Bullet List
    </button>
    <button
      on:click={() => editor?.chain().focus().toggleOrderedList().run()}
      class:is-active={editor?.isActive('orderedList')}
      class:opacity-50={!editor}
      class:cursor-not-allowed={!editor}
      disabled={!editor}
    >
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

  .tiptap-wrapper .tiptap {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem;
    min-height: 150px;
  }

  .tiptap-wrapper .tiptap:focus {
    outline: none;
    border-color: #66afe9;
    box-shadow: 0 0 0 1px #66afe9;
  }
</style>
