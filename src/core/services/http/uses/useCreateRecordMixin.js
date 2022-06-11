import CreateRecordMixin from '../mixins/CreateRecordMixin';

export default function(prototype) {
  return {
    createRecord: prototype.createRecord || CreateRecordMixin.createRecord,
    beforeSave: prototype.beforeSave || CreateRecordMixin.beforeSave
  };
}
