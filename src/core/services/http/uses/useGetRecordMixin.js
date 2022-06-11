import GetRecordMixin from '../mixins/GetRecordMixin';

export default function(prototype) {
  return {
    getRecord: prototype.getRecord || GetRecordMixin.getRecord
  };
}
