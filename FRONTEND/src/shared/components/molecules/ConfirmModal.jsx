import React from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, HelpCircle } from 'lucide-react';

/**
 * Modal de confirmación/alerta reutilizable
 * Reemplaza los alert() y confirm() nativos del navegador
 * 
 * @param {boolean} show - Mostrar/ocultar modal
 * @param {Function} onClose - Callback al cerrar
 * @param {Function} onConfirm - Callback al confirmar (para tipo 'confirm')
 * @param {string} title - Título del modal
 * @param {string} message - Mensaje principal
 * @param {string} type - Tipo: 'success', 'error', 'warning', 'info', 'confirm'
 * @param {string} confirmText - Texto del botón confirmar
 * @param {string} cancelText - Texto del botón cancelar
 */
export const ConfirmModal = ({
  show,
  onClose,
  onConfirm,
  title,
  message,
  type = 'info',
  confirmText = 'Aceptar',
  cancelText = 'Cancelar',
  loading = false
}) => {
  if (!show) return null;

  const typeConfig = {
    success: {
      icon: CheckCircle,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      buttonBg: 'bg-green-600 hover:bg-green-700',
      headerBg: 'bg-gradient-to-r from-green-500 to-green-600'
    },
    error: {
      icon: AlertCircle,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      buttonBg: 'bg-red-600 hover:bg-red-700',
      headerBg: 'bg-gradient-to-r from-red-500 to-red-600'
    },
    warning: {
      icon: AlertTriangle,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      buttonBg: 'bg-yellow-600 hover:bg-yellow-700',
      headerBg: 'bg-gradient-to-r from-yellow-500 to-yellow-600'
    },
    info: {
      icon: Info,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      buttonBg: 'bg-blue-600 hover:bg-blue-700',
      headerBg: 'bg-gradient-to-r from-blue-500 to-blue-600'
    },
    confirm: {
      icon: HelpCircle,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      buttonBg: 'bg-purple-600 hover:bg-purple-700',
      headerBg: 'bg-gradient-to-r from-purple-500 to-purple-600'
    }
  };

  const config = typeConfig[type] || typeConfig.info;
  const Icon = config.icon;
  const isConfirmType = type === 'confirm';

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con gradiente */}
        <div className={`${config.headerBg} p-6 text-white`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full bg-white/20`}>
              <Icon size={32} />
            </div>
            <div>
              <h2 className="text-xl font-bold">{title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
            {message}
          </p>
        </div>

        {/* Footer con botones */}
        <div className="px-6 pb-6 flex gap-3">
          {isConfirmType && (
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`flex-1 px-6 py-3 ${config.buttonBg} text-white rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl disabled:opacity-50`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Procesando...
              </span>
            ) : confirmText}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

/**
 * Hook para usar el ConfirmModal de forma imperativa
 * Similar a cómo funciona alert() y confirm()
 */
export const useConfirmModal = () => {
  const [modalState, setModalState] = React.useState({
    show: false,
    title: '',
    message: '',
    type: 'info',
    confirmText: 'Aceptar',
    cancelText: 'Cancelar',
    onConfirm: null,
    loading: false
  });

  const showAlert = (message, title = 'Aviso', type = 'info') => {
    return new Promise((resolve) => {
      setModalState({
        show: true,
        title,
        message,
        type,
        confirmText: 'Aceptar',
        cancelText: 'Cancelar',
        onConfirm: () => resolve(true),
        loading: false
      });
    });
  };

  const showConfirm = (message, title = 'Confirmar', options = {}) => {
    return new Promise((resolve) => {
      setModalState({
        show: true,
        title,
        message,
        type: 'confirm',
        confirmText: options.confirmText || 'Confirmar',
        cancelText: options.cancelText || 'Cancelar',
        onConfirm: () => resolve(true),
        loading: false
      });

      // Para el caso de cancelar, resolver con false
      const originalOnClose = () => {
        setModalState(prev => ({ ...prev, show: false }));
        resolve(false);
      };
      setModalState(prev => ({ ...prev, onClose: originalOnClose }));
    });
  };

  const showSuccess = (message, title = '¡Éxito!') => showAlert(message, title, 'success');
  const showError = (message, title = 'Error') => showAlert(message, title, 'error');
  const showWarning = (message, title = 'Atención') => showAlert(message, title, 'warning');
  const showInfo = (message, title = 'Información') => showAlert(message, title, 'info');

  const closeModal = () => {
    setModalState(prev => ({ ...prev, show: false }));
  };

  const ModalComponent = () => (
    <ConfirmModal
      show={modalState.show}
      onClose={closeModal}
      onConfirm={modalState.onConfirm}
      title={modalState.title}
      message={modalState.message}
      type={modalState.type}
      confirmText={modalState.confirmText}
      cancelText={modalState.cancelText}
      loading={modalState.loading}
    />
  );

  return {
    ModalComponent,
    showAlert,
    showConfirm,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    closeModal
  };
};

export default ConfirmModal;
