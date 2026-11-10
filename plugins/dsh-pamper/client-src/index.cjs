const React = require('react');
const { dicts, makePetConfigSection } = require('./vendor/dsh-pet/src/client/settings.ts');
const { createLoveEntry } = require('./love/love-entry.js');

const t = (key) => (dicts.zh && dicts.zh[key]) || key;
const h = React.createElement;

function apply(ctx) {
  const PetConfigSection = makePetConfigSection({
    h,
    useState: React.useState,
    useEffect: React.useEffect,
    useRef: React.useRef,
    useCallback: React.useCallback,
    t
  }, ctx);
  const { LovePanel, LoveIcon } = createLoveEntry({
    h,
    useEffect: React.useEffect,
    useRef: React.useRef,
    PetConfigSection,
    ROUTE_PATH: '/dsh-pamper-7470'
  });
  ctx.slots.inject('sidebar.panellist', function* () {
    yield ctx.slots.register({ name: 'sidebar.panellist', id: 'pamper', order: 4, label: () => '宠爱' }, LoveIcon);
  });
  ctx.slots.inject('main', function* () {
    yield ctx.slots.register({ name: 'main', key: 'pamper' }, LovePanel);
  });
}

module.exports = { inject: ['slots'], apply };
