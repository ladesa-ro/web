<template>
  <UIContainer>
    <nav class="flex justify-between items-center">
      <UITitleWithGoBack to="../" text="Gestão de Calendários Acadêmicos" />

      <div class="flex gap-3.5">
        <NuxtLink to="./dias-nao-letivos">
          <UIButtonDefaultSquare>
            <IconsCalendarX class="w-6 h-full" />
          </UIButtonDefaultSquare>
        </NuxtLink>

        <!-- add EditOrCreateModal aqui -->
        <UIButtonDefaultSquare>
          <IconsAdd class="w-6 h-full" />
        </UIButtonDefaultSquare>
      </div>
    </nav>
  </UIContainer>
</template>
