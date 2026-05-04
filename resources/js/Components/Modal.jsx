import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react';

export default function Modal({
    children,
    show = false,
    maxWidth = '2xl',
    closeable = true,
    onClose = () => {},
}) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm:    'sm:max-w-sm',
        md:    'sm:max-w-md',
        lg:    'sm:max-w-lg',
        xl:    'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[maxWidth];

    return (
        <Transition show={show} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 sm:px-6"
                onClose={close}
            >
                {/* Dark blurred backdrop */}
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0" style={{ background: 'rgba(5,8,18,0.88)', backdropFilter: 'blur(6px)' }} />
                </TransitionChild>

                {/* Panel — dark glass, scrolls internally if content is tall */}
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 scale-95"
                    enterTo="opacity-100 translate-y-0 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 scale-100"
                    leaveTo="opacity-0 translate-y-4 scale-95"
                >
                    <DialogPanel
                        className={`relative z-10 w-full overflow-y-auto rounded-2xl shadow-2xl transition-all sm:mx-auto ${maxWidthClass}`}
                        style={{
                            background: '#0f1628',
                            border: '1px solid rgba(99,150,255,0.25)',
                            boxShadow: '0 25px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(79,140,255,0.08)',
                            maxHeight: 'calc(100vh - 4rem)',
                        }}
                    >
                        {children}
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
}
