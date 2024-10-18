import { useState, useEffect, FC, memo, useCallback } from 'react';

// Вспомогательная функция для конвертации изображения в формат WebP
const convertBlobToWebp = async (blob: Blob, quality: number): Promise<string> => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.src = URL.createObjectURL(blob);
		img.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = img.width;
			canvas.height = img.height;
			const ctx = canvas.getContext('2d');
			if (ctx) {
				ctx.drawImage(img, 0, 0);
				canvas.toBlob(
					(blob) => {
						if (blob) {
							resolve(URL.createObjectURL(blob));
						} else {
							reject(new Error('Ошибка при конвертации в WebP'));
						}
					},
					'image/webp',
					quality,
				); // Передаем качество сжатия
			} else {
				reject(new Error('Не удалось получить контекст холста'));
			}
		};
		img.onerror = () => reject(new Error('Ошибка загрузки изображения'));
	});
};

// Типы пропсов
type WebpImagePropsType = {
	src: string;
	alt: string;
	quality?: number; // Добавляем опциональный пропс для контроля качества
};

export const WebpImage: FC<WebpImagePropsType> = memo(({ src, alt, quality = 0.8 }) => {
	const [webpSrc, setWebpSrc] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	// Функция для загрузки и конвертации изображения
	const convertToWebp = useCallback(async () => {
		try {
			setError(null); // Сбрасываем ошибку перед началом обработки
			const response = await fetch(src);
			if (!response.ok) throw new Error('Ошибка загрузки изображения');

			const blob = await response.blob();
			const webpUrl = await convertBlobToWebp(blob, quality); // Передаем уровень качества
			setWebpSrc(webpUrl); // Устанавливаем результат только после завершения промиса
		} catch (err) {
			setError((err as Error).message);
		}
	}, [src, alt, quality]);

	useEffect(() => {
		convertToWebp(); // Обработка промиса
	}, [convertToWebp]);

	if (error) return <div>Ошибка: {error}</div>;
	if (!webpSrc) return <div>Загрузка...</div>;

	return (
		<picture>
			<source srcSet={webpSrc} type="image/webp" />
			<img src={src} alt={alt} />
		</picture>
	);
});
