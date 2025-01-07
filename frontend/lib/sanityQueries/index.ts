export const siteSettingsQueryString = `
	*[_type == 'siteSettings'][0] {
		...,
	}
`;

export const projectsQueryString = `
	*[_type == 'project'] | order(orderRank) [0...100] {
		...,
		desktopMedia {
			asset-> {
				playbackId,
			},
		},
		mobileMedia {
			asset-> {
				playbackId,
			},
		}
	}
`;
