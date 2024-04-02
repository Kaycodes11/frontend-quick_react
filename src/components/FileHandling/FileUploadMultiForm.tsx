import React, {useState, useEffect} from "react";
import {useForm, Controller} from "react-hook-form";

interface FormValues {
    files: FileList | null;
}

const FileUploadMultiForm = () => {
    const {control, handleSubmit, watch, formState: {errors}, setValue} = useForm<FormValues>({
        defaultValues: {
            files: null,
        },
    });
    const [previews, setPreviews] = useState<string[]>([]);

    const selectedFiles = watch("files");

    useEffect(() => {
        if (selectedFiles && selectedFiles.length > 0) {
            const newPreviews = Array.from(selectedFiles).map((file) => {
                return URL.createObjectURL(file);
            });
            setPreviews(newPreviews);
        } else {
            // Clear previews if no files are selected
            setPreviews([]);
        }
    }, [selectedFiles]);

    const onSubmit = (data: FormValues) => {
        if (data.files && data.files.length > 0) {
            console.log(data.files); // Process your files here
        }
    };

    const styles: Record<string, React.CSSProperties> = {
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
        },
        input: {
            margin: '10px 0',
        },
        preview: {
            maxWidth: '200px',
            maxHeight: '200px',
            objectFit: 'cover',
            marginRight: '10px',
        },
        error: {
            color: 'red',
        },
        submitButton: {
            padding: '10px 20px',
            cursor: 'pointer',
        },
        previewsContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
            <Controller
                control={control}
                name="files"
                rules={{
                    validate: {
                        required: (files) => files && files.length > 0 || "Files are required",
                        size: (files) => Array.from(files || []).every(file => file.size <= 1024 * 1024) || "Each file size must be less than 1MB",
                    },
                }}
                render={({field: {onChange, ref}}) => (
                    <input
                        type="file"
                        multiple
                        style={styles.input}
                        onChange={(e) => {
                            const files = e.target.files;
                            if (!files || Array.from(files).some(file => file.size > 1024 * 1024)) {
                                alert("Each file size must be less than 1MB");
                                e.target.value = ''; // Clear the input if any file is too large
                                setValue("files", null); // Also clear the files value in form state
                                return;
                            }
                            onChange(files);
                        }}
                        ref={ref}
                    />
                )}
            />
            {errors.files && <p style={styles.error}>{errors.files.message}</p>}

            <div style={styles.previewsContainer}>
                {previews.map((preview, index) => (
                    <img key={index} src={preview} alt="Preview" style={styles.preview}/>
                ))}
            </div>

            <button type="submit" style={styles.submitButton}>Upload</button>
        </form>
    );
};

export default FileUploadMultiForm;
