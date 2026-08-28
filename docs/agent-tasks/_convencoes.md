<!-- Bloco comum, referenciado por todos os prompts de slice da issue #789. -->

## Convenções do repo (seguir sempre)

- Página = wrapper fino: `pages/.../index.vue` com `definePageMeta` + `<SectionX />`.
- Section = `components/Section/<Entidade>/{Grid,Form,View,Modal}`, grid de cards com busca/paginação como `Section/Ambientes` e `Section/Turmas`.
- Modais de CRUD via `Dialog/Modal/EditOrCreateModal.vue` + `ModalBaseLayout.vue`; confirmações destrutivas via `Dialog/Confirm/DialogConfirm.vue`.
- Campos de formulário via `VV/*` (vee-validate): `TextField`, `SelectField`, `DateField`, `TimeField`, `TimeRangeField`, `CheckboxField`, `ColorPalette`, `Autocomplete`, `ParticipantesSelector`, `RRuleEditor` (já existe e cobre o campo `repeticao`).
- Dados via TanStack Query, com invalidação por chave após cada mutation.
- O client de API é gerado (`src/packages/ladesa-api-client`); não editar `__generated__` na mão.
