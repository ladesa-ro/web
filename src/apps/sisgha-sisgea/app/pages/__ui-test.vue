<script setup lang="ts">
import {
  Alert,
  Breadcrumb,
  Button,
  ButtonAdd,
  ButtonArrow,
  ButtonEdit,
  ButtonEventsList,
  ButtonModalAdvance,
  ButtonModalCancel,
  ButtonModalClearDanger,
  ButtonModalConfirm,
  ButtonModalDelete,
  ButtonModalGoBack,
  ButtonSearch,
  Card,
  CardActions,
  CardAutoSkeleton,
  CardLine,
  CardSelectionDiscipline,
  CardSkeleton,
  Checkbox,
  Footer,
  IconHome,
  Loading,
  Pagination,
  ProgressCircular,
  Radio,
  Title,
  Toggle,
} from '@ladesa-ro/web.ui';
import { ref } from 'vue';

definePageMeta({ auth: false });

const radioValue = ref('a');
const checkedItems = ref<string[]>([]);
const toggleValue = ref('x');
const page = ref(1);
</script>

<template>
  <div style="padding: 2rem; display: flex; flex-direction: column; gap: 2rem">
    <section>
      <h2>Button</h2>
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap">
        <Button>Padrão</Button>
        <Button :outline-on-click="false">Sem outline</Button>
        <Button disabled>Desabilitado</Button>
      </div>
    </section>

    <section>
      <h2>ProgressCircular / Loading</h2>
      <div style="display: flex; gap: 1rem; align-items: center">
        <ProgressCircular size="2rem" />
        <div style="width: 4rem; height: 4rem">
          <Loading />
        </div>
      </div>
    </section>

    <section>
      <h2>Title</h2>
      <Title variant="default">Título default</Title>
      <Title variant="small">Título small</Title>
      <Title variant="mini">Título mini</Title>
    </section>

    <section>
      <h2>Alert</h2>
      <div style="display: flex; flex-direction: column; gap: 0.5rem">
        <Alert type="info" message="Mensagem informativa" />
        <Alert type="success" message="Mensagem de sucesso" />
        <Alert type="warning" message="Mensagem de aviso" />
        <Alert type="error" message="Mensagem de erro" />
      </div>
    </section>

    <section>
      <h2>Toggle</h2>
      <Toggle
        v-model="toggleValue"
        :items="[
          { text: 'X', value: 'x' },
          { text: 'Y', value: 'y' },
        ]"
      />
    </section>

    <section>
      <h2>Radio</h2>
      <Radio
        v-model="radioValue"
        :items="[
          { label: 'Opção A', value: 'a' },
          { label: 'Opção B', value: 'b' },
        ]"
      />
    </section>

    <section>
      <h2>Checkbox</h2>
      <Checkbox
        v-model="checkedItems"
        :items="[
          { label: 'Item 1', value: '1' },
          { label: 'Item 2', value: '2' },
        ]"
      />
    </section>

    <section>
      <h2>Pagination</h2>
      <Pagination v-model:current-page="page" :total-pages="5" />
    </section>

    <section>
      <h2>Card</h2>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap">
        <div style="width: 16rem">
          <Card variant="block" :src="null" title="Card de teste">
            Descrição do card
            <template #actions>
              <IconHome style="width: 1rem" />
            </template>
          </Card>
        </div>
        <div style="width: 16rem">
          <CardSkeleton />
        </div>
        <div style="width: 16rem">
          <CardAutoSkeleton :skeleton="true" />
        </div>
      </div>
      <CardLine title="Card em linha">Descrição</CardLine>
      <CardSelectionDiscipline text="Disciplina selecionada" />
    </section>

    <section>
      <h2>Footer</h2>
      <Footer />
    </section>

    <section>
      <h2>Breadcrumb</h2>
      <Breadcrumb
        :segments="[
          { title: 'Início', to: '/' },
          { title: 'Seção', to: '/secao' },
          { title: 'Página atual' },
        ]"
        show-go-back
        @go-back="() => {}"
      />
    </section>

    <section>
      <h2>Button family</h2>
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap">
        <ButtonAdd />
        <ButtonArrow />
        <ButtonSearch />
        <ButtonEdit />
        <ButtonEventsList />
      </div>
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; margin-top: 1rem">
        <ButtonModalConfirm />
        <ButtonModalCancel />
        <ButtonModalAdvance />
        <ButtonModalGoBack />
        <ButtonModalDelete />
        <ButtonModalClearDanger text="Limpar" />
      </div>
    </section>

    <section>
      <h2>CardActions</h2>
      <CardActions to="/">
        <Button>Ação</Button>
      </CardActions>
    </section>
  </div>
</template>
