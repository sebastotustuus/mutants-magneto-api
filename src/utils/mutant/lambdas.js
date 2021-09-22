/* eslint-disable no-confusing-arrow */
exports.calulateLastValue = (beforeChar, currentChart, currentValue) => beforeChar === currentChart ? currentValue + 1 : 1;

exports.getLastRowKey = (hash, closure) => hash[closure({ modifyRow: -1 })];

exports.getLastUpColumn = (hash, closure) => hash[closure({ modifyColumn: -1 })];

exports.getLastUpRigthKey = (hash, closure) => hash[closure({ modifyRow: -1, modifyColumn: 1 })] || {};

exports.getLastUpLeftKey = (hash, closure) => hash[closure({ modifyRow: -1, modifyColumn: -1 })];

exports.key = ({ indexRow, indexColumn } = {}) => ({ modifyRow = 0, modifyColumn = 0 } = {}) => `${indexRow + modifyRow}${indexColumn + modifyColumn}`;
