import UpdateRecordMixin from '../mixins/UpdateRecordMixin';

export default function(prototype) {
  return {
    updateRecord: prototype.updateRecord || UpdateRecordMixin.updateRecord,
    beforeSave: prototype.beforeSave || UpdateRecordMixin.beforeSave
  };
}
