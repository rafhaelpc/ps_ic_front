import InputText from './formControls/InputText.vue';
import InputMask from './formControls/InputMask.vue';
import InputDate from './formControls/InputDate.vue';
import OverlayPanel from './OverlayPanel.vue';
import CustomToast from './messages/CustomToast.vue';
import CustomModal from './messages/CustomModal.vue';
import LoaderContainer from './basic/LoaderContainer.vue';
import PageHeader from './basic/PageHeader.vue';
import MaterialIcon from './basic/MaterialIcon.vue';
import DataTable from './dataTable/DataTable.vue';
import CustomForm from './formControls/CustomForm.vue';
import CustomPaginator from './basic/CustomPaginator.vue';
import TextSection from './basic/TextSection.vue';

import VueTheMask from 'vue-the-mask';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';

const components = {
  InputText,
  InputMask,
  InputDate,
  OverlayPanel,
  CustomToast,
  CustomModal,
  LoaderContainer,
  PageHeader,
  MaterialIcon,
  DataTable,
  CustomForm,
  CustomPaginator,
  TextSection
};

function install(Vue) {
  Vue.use(VueTheMask);
  Vue.use(ToastService);
  Vue.directive('tooltip', Tooltip);

  for (const componentName in components) {
    const component = components[componentName];

    Vue.component(component.name, component);
  }
}

export default install;
