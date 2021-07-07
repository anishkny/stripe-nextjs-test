import { useRouter } from 'next/router';

export default function SuccessPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Success</h1>
      <p>{id}</p>
    </div>
  );
}
