<script setup>
import { onMounted, defineEmits, defineProps } from "vue";
import E from "wangeditor";

const props = defineProps({ content: String });
const emit = defineEmits(["event"]);
onMounted(() => {
  const editor = new E("#textEditor");
  editor.create();
  // 设置初始值
  props.content && editor.txt.html(props.content);

  editor.config.onchange = function (newHtml) {
    // console.log("change之后最新的html", newHtml);
    emit("event", newHtml);
  };
});
</script>
    <template>
  <div id="textEditor"></div>
</template>