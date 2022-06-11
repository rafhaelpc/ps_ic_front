import { ZIndexUtils, DomHandler, ConnectedOverlayScrollHandler } from 'primevue/utils';

export default {

  data() {
    return {
      overlayVisible: false
    };
  },

  overlay: null,
  outsideClickListener: null,
  resizeListener: null,
  scrollHandler: null,

  beforeUnmount() {
    this.unbindOutsideClickListener();
    this.unbindResizeListener();

    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }

    if (this.overlay) {
      ZIndexUtils.clear(this.overlay);
      this.overlay = null;
    }
  },

  methods: {
    overlayRef(el) {
      this.overlay = el;
    },

    toggleOverlayVisible() {
      if (this.disabled) {
        return;
      }

      this.overlayVisible = !this.overlayVisible;
    },

    hide() {
      this.overlayVisible = false;
    },

    onOverlayEnter(el) {
      ZIndexUtils.set('overlay-teste', el, this.$primevue.config.zIndex.overlay);
      this.alignOverlay();
      this.bindOutsideClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
      this.scrollValueInView();

      if (this.focusOnFirstInput) {
        this.focusOnFirstInput();
      }
    },

    onOverlayLeave() {
      this.unbindOutsideClickListener();
      this.unbindScrollListener();
      this.unbindResizeListener();
      this.overlay = null;
    },

    onOverlayAfterLeave(el) {
      ZIndexUtils.clear(el);
    },

    alignOverlay() {
      this.overlay.style.minWidth = DomHandler.getOuterWidth(this.$el) + 'px';
      DomHandler.absolutePosition(this.overlay, this.$refs.container);
    },

    bindOutsideClickListener() {
      if (!this.outsideClickListener) {
        this.outsideClickListener = (event) => {
          if (this.overlayVisible && this.overlay && !this.$el.contains(event.target) && !this.overlay.contains(event.target)) {
            this.hide();
          }
        };
        document.addEventListener('click', this.outsideClickListener);
      }
    },

    unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener('click', this.outsideClickListener);
        this.outsideClickListener = null;
      }
    },

    bindScrollListener() {
      if (!this.scrollHandler) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.$refs.container, () => {
          if (this.overlayVisible) {
            this.hide();
          }
        });
      }
      this.scrollHandler.bindScrollListener();
    },

    unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    },

    bindResizeListener() {
      if (!this.resizeListener) {
        this.resizeListener = () => {
          if (this.overlayVisible && !DomHandler.isTouchDevice()) {
            this.hide();
          }
        };
        window.addEventListener('resize', this.resizeListener);
      }
    },

    unbindResizeListener() {
      if (this.resizeListener) {
        window.removeEventListener('resize', this.resizeListener);
        this.resizeListener = null;
      }
    },

    scrollValueInView() {
      if (this.overlay) {
        const selectedItem = DomHandler.findSingle(this.overlay, '.tree-select-panel');
        if (selectedItem) {
          selectedItem.scrollIntoView({ block: 'nearest', inline: 'start' });
        }
      }
    }
  }
};
