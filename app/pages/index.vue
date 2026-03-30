<template>
  <div class="view-container space-y-12">
    <section class="bg-primary rounded-3xl p-8 text-white overflow-hidden relative">
      <div class="relative z-10 max-w-2xl">
        <h1 class="text-secondary text-4xl font-extrabold mb-4">Domina la pista. <br/> <span class="text-action">Sincroniza tu juego.</span></h1>
        <p class="text-white/80 mb-6 text-lg">Inscribite a torneos, escala en el ranking y encontrá los mejores clubes de la zona.</p>
        <UiButton variant="tertiary" size="lg" to="/tournaments" icon="lucide:play">
          Empezar a jugar
        </UiButton>
      </div>
      <div class="absolute -right-20 -top-20 w-64 h-64 bg-padel-gradient rounded-full blur-3xl opacity-50"></div>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <NuxtLink to="/tournaments" class="bg-white p-6 rounded-2xl border border-gray/10 hover:shadow-xl transition-all group">
        <Icon name="lucide:trophy" class="w-10 h-10 text-action mb-4 group-hover:scale-110 transition-transform" />
        <h2 class="text-xl font-bold text-primary">Próximos Torneos</h2>
        <p class="text-primary/60 text-sm">Anotate en las categorías 4ta, 5ta y 6ta.</p>
      </NuxtLink>
      </section>

    <section>
      <div class="flex justify-between items-end mb-6">
        <h2 class="text-2xl font-extrabold text-primary">Torneos de esta semana</h2>
        <NuxtLink to="/tournaments" class="text-action font-bold text-sm hover:underline">Ver todos</NuxtLink>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      </div>
    </section>
  </div>
</template>