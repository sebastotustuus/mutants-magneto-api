exports.responseBasic = (isMutant, body) => ({
    ...(isMutant ? {status: 200, statusText: 'OK'} : {status: 403, statusText: 'Forbidden'}),
    isMutant,
})