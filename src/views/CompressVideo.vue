<template>
  <div class="video-compressor">
    <h2>Compresseur Vidéo (TS + FFmpeg)</h2>

    <div v-if="!ready" class="status-msg">
      <span class="loader"></span> Chargement des modules...
    </div>

    <div v-else class="controls">
      <input 
        type="file" 
        accept="video/*" 
        @change="handleFileUpload" 
        :disabled="processing"
      />

      <div v-if="processing" class="progress-container">
        <p>Traitement : <strong>{{ Math.round(progress) }}%</strong></p>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
      </div>

      <div v-if="videoUrl && !processing" class="result">
        <video :src="videoUrl" controls width="100%"></video>
        <a :href="videoUrl" download="compressed_video.mp4" class="download-btn">
          ⬇ Télécharger le résultat
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

// Types FFmpeg
const ffmpeg = new FFmpeg();
const ready = ref<boolean>(false);
const processing = ref<boolean>(false);
const progress = ref<number>(0);
const videoUrl = ref<string | null>(null);

onMounted(async () => {
const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'; // Utilisez bien /umd ici
await ffmpeg.load({
  coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
  wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  // Ajoutez cette ligne si vous êtes sur Chrome/Edge :
  workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript'),
});
  ready.value = true;
});

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  processing.value = true;
  progress.value = 0;

  // Callback de progression
  ffmpeg.on('progress', ({ progress: p }) => {
    progress.value = p * 100;
  });

  try {
    const inputName = 'input.mp4';
    const outputName = 'output.mp4';

    // Écriture du fichier en mémoire
    await ffmpeg.writeFile(inputName, await fetchFile(file));

    // Commande de compression
    // -preset veryfast : pour gagner en vitesse au détriment d'un peu de taille
    await ffmpeg.exec([
      '-i', inputName, 
      '-vcodec', 'libx264', 
      '-crf', '28', 
      '-preset', 'veryfast', 
      outputName
    ]);

    // Récupération du résultat
    const data = (await ffmpeg.readFile(outputName)) as any;
    const blob = new Blob([data.buffer], { type: 'video/mp4' });
    
    videoUrl.value = URL.createObjectURL(blob);
  } catch (error) {
    console.error("Erreur FFmpeg:", error);
  } finally {
    processing.value = false;
  }
};
</script>

<style scoped>
.video-compressor {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.progress-bar {
  background: #eee;
  border-radius: 10px;
  height: 10px;
  overflow: hidden;
  margin: 10px 0;
}

.progress-fill {
  background: #42b883;
  height: 100%;
  transition: width 0.3s ease;
}

.download-btn {
  display: block;
  text-align: center;
  background: #35495e;
  color: white;
  padding: 12px;
  text-decoration: none;
  border-radius: 6px;
  margin-top: 15px;
}
</style>