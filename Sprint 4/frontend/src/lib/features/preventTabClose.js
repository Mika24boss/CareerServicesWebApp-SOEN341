export const preventTabClose = (/** @type {any} */ _, /** @type {any} */ enabled) => {
    const handler = (/** @type {{ preventDefault: () => void; returnValue: string; }} */ e) => {
        e.preventDefault();
        e.returnValue = '';
    }, setHandler = (/** @type {boolean} */ shouldWork) => shouldWork ?
        window.addEventListener('beforeunload', handler) :
        window.removeEventListener('beforeunload', handler);
    setHandler(enabled);
    return {
        update: setHandler,
        destroy: () => setHandler(false),
    };
};
