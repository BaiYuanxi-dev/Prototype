<template>
  <el-dialog title="新增"  width="400px" visible @close="handleCancel">
    <el-form :model="initForm">
      <el-form-item label="页号:" class="add-form-item">
        <el-input v-model="initForm.pageId" class="form-input" size="small"/>
      </el-form-item>
      <el-form-item label="简介:" class="add-form-item">
        <el-input v-model="initForm.pageText" class="form-input" size="small"/>
      </el-form-item>
      <el-form-item class="form-item">
        <el-button @click="handleCancel" size="mini">取消</el-button>
        <el-button @click="handleSubmit" size="mini" type="primary">确认</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>
  .add-form-item {
    display: flex;
  }
  .add-form-item .el-input {
    width: 300px;
  }
</style>

<script>
export default {
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      initForm: {
        projectId:-1,
        pageId: -1,
        pageText: '',
      },
    }
  },
  methods: {
      handleCancel() {
        this.$emit('close', param);
      },
      async handleSubmit() {
        await this.$store.dispatch('addPages', this.initForm);
        this.$emit('close', this.initForm);
      }
  },
  mounted() {
    this.initForm = this.form;
  }
}

</script>

