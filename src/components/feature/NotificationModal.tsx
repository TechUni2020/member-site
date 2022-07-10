import { Dialog, Text } from "@mantine/core";
import { FC } from "react";

type Props = {
  bellOpened: boolean;
  setBellOpened: (bellOpened: boolean) => void;
};

export const NotificationModal: FC<Props> = ({ bellOpened, setBellOpened }) => {
  return (
    <>
      <Dialog
        opened={bellOpened}
        withCloseButton
        onClose={() => setBellOpened(false)}
        size="lg"
        radius="md"
        position={{ top: 45, right: 70 }}
      >
        <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
          通知
        </Text>
        {/* NOTE: テスト用 */}
        <div>
          <p>foo</p>
          <p>foo</p>
          <p>foo</p>
          <p>foo</p>
          <p>foo</p>
          <p>foo</p>
          <p>foo</p>
        </div>
      </Dialog>
    </>
  );
};
