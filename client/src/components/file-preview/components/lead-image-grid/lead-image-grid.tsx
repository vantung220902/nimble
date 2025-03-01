import { Attachment } from '@components/file-upload';
import { Box, Container, Grid, Image, Text } from '@mantine/core';

interface LeadImageGridProps {
  attachments: Attachment[];
}

export function LeadImageGrid({ attachments }: LeadImageGridProps) {
  const imageCount = Math.min(attachments?.length, 6);

  const renderImages = () => {
    switch (imageCount) {
      case 1:
        return (
          <Image
            src={attachments[0].filePath}
            alt={attachments[0].fileName}
            radius="md"
            height={200}
          />
        );
      case 2:
        return (
          <Grid gutter="md">
            <Grid.Col span={6}>
              <Image
                src={attachments[0].filePath}
                alt={attachments[0].fileName}
                radius="md"
                height={200}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Image
                src={attachments[1].filePath}
                alt={attachments[1].fileName}
                radius="md"
                height={200}
              />
            </Grid.Col>
          </Grid>
        );
      case 3:
        return (
          <Grid gutter="md">
            <Grid.Col span={8}>
              <Image
                src={attachments[0].filePath}
                alt={attachments[0].fileName}
                radius="md"
                height={200}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Grid gutter="md">
                <Grid.Col>
                  <Image
                    src={attachments[1].filePath}
                    alt={attachments[1].fileName}
                    radius="md"
                    height={90}
                  />
                </Grid.Col>
                <Grid.Col>
                  <Image
                    src={attachments[2].filePath}
                    alt={attachments[2].fileName}
                    radius="md"
                    height={90}
                  />
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        );
      case 4:
        return (
          <Grid gutter="md">
            <Grid.Col span={6}>
              <Image
                src={attachments[0].filePath}
                alt={attachments[0].fileName}
                radius="md"
                height={200}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Grid gutter="md">
                <Grid.Col span={6}>
                  <Image
                    src={attachments[1].filePath}
                    alt={attachments[1].fileName}
                    radius="md"
                    height={90}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Image
                    src={attachments[2].filePath}
                    alt={attachments[2].fileName}
                    radius="md"
                    height={90}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <Image
                    src={attachments[3].filePath}
                    alt={attachments[3].fileName}
                    radius="md"
                    height={200}
                  />
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        );
      case 5:
      case 6:
        return (
          <Grid gutter="md">
            <Grid.Col span={6}>
              <Image
                src={attachments[0].filePath}
                alt={attachments[0].fileName}
                radius="md"
                height={200}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Grid gutter="md">
                {attachments.slice(1, 5).map((attachment, index) => (
                  <Grid.Col key={attachment.attachmentId} span={6}>
                    <Box sx={{ position: 'relative' }}>
                      <Image
                        src={attachment.filePath}
                        alt={attachment.fileName}
                        radius="md"
                        height={90}
                      />
                      {index === 3 && imageCount === 6 && (
                        <Box
                          sx={(theme) => ({
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: theme.radius.md,
                          })}
                        >
                          <Text color="white" size="xl" fw={700}>
                            +1
                          </Text>
                        </Box>
                      )}
                    </Box>
                  </Grid.Col>
                ))}
              </Grid>
            </Grid.Col>
          </Grid>
        );
      default:
        return null;
    }
  };

  return <Container my="md">{renderImages()}</Container>;
}
