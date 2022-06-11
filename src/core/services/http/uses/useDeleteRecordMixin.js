import DeleteRecordMixin from '../mixins/DeleteRecordMixin';

export default function(prototype) {
  return {
    deleteRecord: prototype.deleteRecord || DeleteRecordMixin.deleteRecord
  };
}
