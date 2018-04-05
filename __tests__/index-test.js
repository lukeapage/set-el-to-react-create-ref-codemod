import { defineTest } from 'jscodeshift/dist/testUtils';

defineTest(__dirname, './src/index', null, 'setEl1');
defineTest(__dirname, './src/index', null, 'setEl2');
defineTest(__dirname, './src/index', null, 'setEl3');
