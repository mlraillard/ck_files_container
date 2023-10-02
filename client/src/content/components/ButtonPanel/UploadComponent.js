import { useDisclosure } from '@mantine/hooks';
import { Drawer, Box, Button, Group, Stack, FileInput, TextInput, Fieldset } from '@mantine/core';
import { useForm } from '@mantine/form';

export const UploadComponent = (props) => {
    const [opened, { open, close }] = useDisclosure(false);
    const form = useForm({
        initialValues: {
          file: null,
          desc: '',
          dir: `${props.dir}`
        },
    
        //validate: {
        //  file.n: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid //email'),
        //},
      });

    return (
        <>
        <Drawer opened={opened} onClose={close} title="Upload a ChucK File">
            <Box maw={340} mx="auto">
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <FileInput
                        label="File"
                        description={`Directory: ${props.dir}`} 
                        placeholder="Choose file to upload"
                        {...form.getInputProps('file')}
                    />
                    <TextInput
                        label="Description"
                        placeholder="File display description"
                        {...form.getInputProps('desc')}
                    />
                    <Group justify="flex-end" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
            </Box>
        </Drawer>
  
        <Button onClick={open}>Upload</Button>
        </>
    )
}
