import GetCollectionMixin from '../mixins/GetCollectionMixin';

export default function(prototype) {
  return {
    getCollection: prototype.getCollection || GetCollectionMixin.getCollection,
    _getParamsFromOptions: GetCollectionMixin._getParamsFromOptions,
    _saveOptions: GetCollectionMixin._saveOptions,
    _getLimit: GetCollectionMixin._getLimit,
    _getPage: GetCollectionMixin._getPage,
    _getSort: GetCollectionMixin._getSort,
    _getFilter: GetCollectionMixin._getFilter,
    _getResponseFormat: GetCollectionMixin._getResponseFormat
  };
}
