export function useResourceDelete(options: {
  remove: (id: string) => Promise<unknown>;
  invalidate: () => Promise<unknown>;
  redirectTo: string;
}) {
  const confirmDelete = useConfirmDelete();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const confirmed = await confirmDelete.confirm();
    if (confirmed) {
      await options.remove(id);
      await options.invalidate();
      router.push(options.redirectTo);
    }
  };

  return { confirmDelete, handleDelete };
}
