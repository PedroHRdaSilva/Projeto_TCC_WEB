import ResetPasswordForm from "@/app/reset-password/[token]/ResetPasswordForm";

interface ResetPasswordProps {
  params: {
    token: string;
  };
}

export default function ResetPasswordPage({ params }: ResetPasswordProps) {
  const { token } = params;

  return (
    <div className="flex h-full w-screen lg:h-screen">
      <div className="w-full p-6 lg:w-2/5">
        <div className="mx-auto flex h-full w-full max-w-sm flex-col justify-center space-y-8">
          <div className="flex flex-col space-y-1">
            <p className="text-3xl text-foreground">Definir nova senha</p>
          </div>

          <ResetPasswordForm token={token} />
        </div>
      </div>
    </div>
  );
}
